import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon } from "wagmi/chains";

const isLocal = process.env.NODE_ENV === "development";

export const config = createConfig(
  getDefaultConfig({
    chains: [polygon],
    transports: {
      [polygon.id]: http(
        `https://polygon-amoy.g.alchemy.com/v2/B4keMDrB6QnwPnZU7Ro86UhicszkzeAp`,
        {
          key: "B4keMDrB6QnwPnZU7Ro86UhicszkzeAp",
        },
      ),
    },
    walletConnectProjectId: "",
    appName: "ReliefResQ",
  }),
);

export const config2 = createConfig(
  getDefaultConfig({
    transports: {
      31337: http("http://127.0.0.1:8545/"),
    },
    walletConnectProjectId: "",
    appName: "ReliefResQ",
  }),
);

const queryClient = new QueryClient();

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={isLocal ? config : config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
