const data = {
    DEV: true,
    TITLE: 'Vonage Events',
    VERSION: '0.0.1',
    FROM: 'VonageEvents',
    SENDER_ID: 'vonage_events_yjsuvuw1_agent', // walter 'walter_rodriguez_2mncez2t_agent',
    JWT: `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTYzMDY2MDgsImV4cCI6MTc4Nzg0MjYwOCwianRpIjoiR2dxSzEzTDQxT3diIiwiYXBwbGljYXRpb25faWQiOiI4OGVjMDVmZS05YTc2LTRlMTUtYTYxMy01YTE0OTAzMDJhMDciLCJzdWIiOiIiLCJhY2wiOiIifQ.wqfJgJvt-dIg6YPwwRqwYXs5T88EwKaeBWypbJepEBWILqQYZDx5qokWOc5d0WDTFbLuqNWRnFiF0gMYPEltgrv9I7VKboXDjRnaAI0X2aLO9IZ1MfSygdd7d1oFdBQiCviDT9tf5LW48PZ_vugf4hvfwS-m7RI3vj6jkxHRCJV7aMsubZZVRlLSHx0cO2JrtzpLr-QRpxE9xl45efiVM8l7807D-__ogTxuIsPQ_fZ9dCvgNlBBQ7dt2lPsWbsPJa0TcmN9XtNzNzc_2tn7suszlyebNEBj3wAbPwcmN004lexko0ZehJr2bAxlPJeX393YwIq1tRYh8rD1R8GtkA`, // walter `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTU3Nzk4NTUsImV4cCI6MTc4NzMxNTg1NSwianRpIjoiWUtCRjVOWkM1dHVDIiwiYXBwbGljYXRpb25faWQiOiIxZTM4ZWZjMS1jYzE4LTRjOWUtODFhNC1iMTE5ZTcxNjJhOGMiLCJzdWIiOiIiLCJhY2wiOiIifQ.VhTzHIOBaZt5aLDBre89nlzPpdIMD_3TmK0RiNHCx4y_tCahTpi-lA5pz6O5Co_XrziyU1M15a7krR6dAgcuTzyjEmLpdjUZpjKhBtNaVHvpazKfxYtmzH6ZOZOYV-7lDJ3YNRqdqkD_mdbSKoTffndb9cJWlaWN3Idk_qa_CKWtw9mqMifefCc6v00VF_KCRsBlEW3lEJXwlIEmOVfqsx3SDhscP-99hXkzDLdXb0y1j-lhEqvU0m79bTanCpjlY2GSsPPBHs9aHKWTb1lUBwhDlpe_JwsP-27ISroV95Cgett8aZfpUno-4Agd4WvEr967ryD3vM3BeTcX_0Xs-w`, //  JWT from my app "dreamforce" 
    SERVER: process.env.VCR_INSTANCE_PUBLIC_URL || 'https://ac306e958376.ngrok-free.app',
    IMAGES: {
        LOGO: '/dreamforce_logo.png'
    },
    TEXT: {
        QRCODE_INTRO: `Curious about RCS in action?`,
        QRCODE_INTRO_2: `Just type your name and instantly get a QR code to start chatting with our smart messaging agent.`
    }
}

module.exports = {
    data
}