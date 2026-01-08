import asyncio, os
from motor.motor_asyncio import AsyncIOMotorClient

async def test():
    uri = os.getenv("MONGODB_URI")
    print("MONGODB_URI=", uri)
    if not uri:
        print("No MONGODB_URI found in environment. Ensure backend/.env exists or export MONGODB_URI.")
        return
    client = AsyncIOMotorClient(uri, tls=True, tlsAllowInvalidCertificates=True)
    try:
        await client.admin.command("ping")
        print("Connected OK with tlsAllowInvalidCertificates=True")
    except Exception as e:
        print("Connect error (tlsAllowInvalidCertificates=True):", repr(e))
    finally:
        client.close()

asyncio.run(test())
