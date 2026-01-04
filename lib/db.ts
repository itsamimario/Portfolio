import { Pool, PoolClient, QueryResult } from 'pg';

/**
 * PostgreSQL connection pool
 * Manages database connections for the RAG chatbot
 */

let pool: Pool | null = null;

/**
 * Get or create database connection pool
 */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  return pool;
}

/**
 * Execute a SQL query
 */
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const pool = getPool();
  return pool.query<T>(text, params);
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const pool = getPool();
  return pool.connect();
}

/**
 * Close all database connections
 * Call this when shutting down the application
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

/**
 * Check database connection health
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const result = await query('SELECT 1');
    return result.rows.length === 1;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

/**
 * Vector similarity search using pgvector
 * Returns documents most similar to the query embedding
 */
export interface EmbeddingRow {
  id: number;
  content: string;
  metadata: Record<string, any>;
  source: string;
  similarity: number;
}

export async function vectorSearch(
  queryEmbedding: number[],
  limit: number = 5,
  source?: string
): Promise<EmbeddingRow[]> {
  let queryText = `
    SELECT
      id,
      content,
      metadata,
      source,
      1 - (embedding <=> $1::vector) AS similarity
    FROM embeddings
  `;

  const params: any[] = [JSON.stringify(queryEmbedding)];

  if (source) {
    queryText += ` WHERE source = $2`;
    params.push(source);
  }

  queryText += `
    ORDER BY embedding <=> $1::vector
    LIMIT $${params.length + 1}
  `;
  params.push(limit);

  const result = await query<EmbeddingRow>(queryText, params);
  return result.rows;
}

/**
 * Insert a new embedding
 */
export interface InsertEmbeddingParams {
  content: string;
  embedding: number[];
  metadata?: Record<string, any>;
  source?: string;
}

export async function insertEmbedding(
  params: InsertEmbeddingParams
): Promise<number> {
  const { content, embedding, metadata = {}, source } = params;

  const result = await query<{ id: number }>(
    `
      INSERT INTO embeddings (content, embedding, metadata, source)
      VALUES ($1, $2::vector, $3, $4)
      RETURNING id
    `,
    [content, JSON.stringify(embedding), JSON.stringify(metadata), source]
  );

  return result.rows[0].id;
}

/**
 * Delete all embeddings (useful for re-indexing)
 */
export async function deleteAllEmbeddings(): Promise<void> {
  await query('TRUNCATE TABLE embeddings');
}

/**
 * Get embedding count
 */
export async function getEmbeddingCount(source?: string): Promise<number> {
  let queryText = 'SELECT COUNT(*) as count FROM embeddings';
  const params: any[] = [];

  if (source) {
    queryText += ' WHERE source = $1';
    params.push(source);
  }

  const result = await query<{ count: string }>(queryText, params);
  return parseInt(result.rows[0].count, 10);
}
