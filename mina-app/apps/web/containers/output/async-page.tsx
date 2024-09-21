"use client";

import { Charts, ChartData } from "@/components/result/charts";
import { usePathname, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAnalysis, useAnalysisStore } from "@/lib/stores/analysis";
import { useWalletStore } from "@/lib/stores/wallet";
import { useClientStore } from "@/lib/stores/client";

// Example data simulating asset allocation across blockchains
const blockchainData = [
  ["Stable Coin", "Polygon", 50],
  ["Stable Coin", "Ethereum", 30],
  ["Stable Coin", "mina", 20],
  ["NFT", "Polygon", 60],
  ["NFT", "Ethereum", 30],
  ["NFT", "mina", 10],
  ["Token", "Polygon", 40],
  ["Token", "Ethereum", 50],
  ["Token", "mina", 10],
];

// Formatting data to fit the chart's structure
function formatChartData(assetDistribution: { [assetType: string]: { [network: string]: number } }): ChartData[] {
  const chartData: ChartData[] = [];

  for (const assetType in assetDistribution) {
    const networkData = assetDistribution[assetType];
    const formattedData: ChartData = {
      assetType,
      polygon: networkData.Polygon || 0,
      ethereum: networkData.Ethereum || 0,
      mina: networkData.mina || 0,
      other: networkData.Other || 0,
    };

    chartData.push(formattedData);
  }

  return chartData;
}

function analyzeBlockchainData(data: string[][]) {
  const chartData: { [assetType: string]: { [network: string]: number } } = {};

  data.forEach(([assetType, network, amount]) => {
    if (!chartData[assetType]) {
      chartData[assetType] = {};
    }
    chartData[assetType][network] = (chartData[assetType][network] || 0) + amount;
  });

  return chartData;
}

export default function Dna() {
  const pathname = usePathname();
  const param = useParams();
  const [data, setData] = useState<ChartData[]>([]);

  const wallet = useWalletStore();
  const client = useClientStore();
  const analysisStore = useAnalysisStore();

  if (param["url"] === undefined) {
    return <></>;
  }

  const url = param["url"];

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    const load = async () => {
      await analysisStore.loadAnalysis(client.client!, wallet.wallet!);
    };
    load();
  }, [url]);

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    if (analysisStore.url[wallet.wallet] == url) {
      // Here we use mock blockchain data for analysis
      const analysisResult = analyzeBlockchainData(blockchainData);
      const chartData = formatChartData(analysisResult);
      setData(chartData);
    }
  }, [analysisStore.url]);

  return (
    <>
      <div className="mx-auto -mt-32 h-full pt-16">
        <div className="flex h-full w-full items-center justify-center pt-16">
          <div className="flex basis-9/12 flex-col items-center justify-center 2xl:basis-3/12">
            <Charts data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
