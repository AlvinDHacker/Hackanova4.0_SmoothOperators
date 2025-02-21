"use client";
import { useState } from "react";
import { SiweMessage, generateNonce } from "siwe";
import { BrowserProvider } from "ethers";
import { useUser } from "~/components/AuthComponent";
import { useSession, signIn, signOut } from "next-auth/react";

export default function WalletLogin() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleLogin = async () => {
    if (!window.ethereum) return alert("MetaMask required");

    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce: generateNonce(),
      });

      const signature = await signer.signMessage(message.prepareMessage());
      await signIn("credentials", {
        message: JSON.stringify(message),
        signature,
      });
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Signed in as: {user.walletId}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={handleLogin}>Sign In with Ethereum</button>
        </>
      )}
    </div>
  );
}
