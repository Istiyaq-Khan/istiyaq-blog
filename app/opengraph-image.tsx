import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Istiyaq Khan - Creator & Engineer';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // Fonts would ostensibly be loaded here

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#111111',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20, color: '#8B5CF6' }}>
                        Istiyaq Khan
                    </div>
                    <div style={{ fontSize: 32, color: '#A3E635' }}>
                        Creator • Engineer • System Builder
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
