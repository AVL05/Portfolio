import { ImageResponse } from 'next/og';
// App router includes @vercel/og by default in ImageResponse

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Alex Vicente López';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #111 0%, #000 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '60px 80px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 30,
                color: '#888',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Portfolio & Photography
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 20,
              color: '#444',
            }}
          >
            aleviclop.vercel.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
