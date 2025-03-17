// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';


export async function GET(request: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#f9fafb',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#1a202c',
          padding: '20px',


        }}
        >
          <h1 style={{ fontSize: 64, fontWeight: 'bold', marginBottom: '20px' }}>
            Blockchain Voting App
          </h1>
          <p style={{ fontSize: 32, marginBottom: '40px' }}>
            Vote in all security and fairness.
          </p>
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#4A90E2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
            }}
          >
            🗳️
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
      >
        <h1 style={{ fontSize: 64, fontWeight: 'bold', marginBottom: '20px' }}>
          Blockchain Voting App
        </h1>
        <p style={{ fontSize: 32, marginBottom: '40px' }}>
          Vote in all security and fairness.
        </p>
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#4A90E2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 40,
            fontWeight: 'bold',
          }}
        >
          🗳️
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
      }
    }
  );
}