import React from "react";
import { Box, Text } from "ink";
import Divider from "ink-divider";
import {
  FailedStatusSpinner,
  OkStatusSpinner,
  FetchingStatusSpinner,
  QueryStatusSpinner
} from "./StatusSpinners";

import type { Transaction, TransactionReceipt } from "web3-core";
import type TruffleConfig from "@truffle/config";
import type { Db, Resources } from "@truffle/db";

import { useDecoder } from "@truffle/db-kit/cli/hooks";

import { DecodeTransactionResult as Result } from "./Result";

export interface Props {
  config: TruffleConfig;
  db: Db;
  project: Resources.IdObject<"projects">;
  transaction: Transaction;
  receipt: TransactionReceipt;
  addresses: string[];
}

export const DecodeTransactionSplash = ({
  config,
  db,
  project,
  transaction,
  receipt,
  addresses
}: Props) => {
  const { decoder, statusByAddress } = useDecoder({
    config,
    db,
    project,
    network: { name: config.network },
    addresses
  });

  const spinners = Object.entries(statusByAddress).map(([address, status]) => {
    switch (status) {
      case "querying":
        return <QueryStatusSpinner address={address} />;
      case "fetching":
        return <FetchingStatusSpinner address={address} />;
      case "ok":
        return <OkStatusSpinner address={address} />;
      case "failed":
        return <FailedStatusSpinner address={address} />;
    }
  });

  const showLoaders = Object.values(statusByAddress).find(
    status => status !== "ok"
  );

  const body = decoder && (
    <Box flexDirection="column">
      <Box justifyContent="center" marginBottom={1}>
        <Divider width={10} />
      </Box>
      <Result decoder={decoder} transaction={transaction} receipt={receipt} />
    </Box>
  );

  return (
    <Box flexDirection="column">
      {showLoaders && (
        <Box
          key="loaders"
          flexDirection="column"
          borderStyle="round"
          borderColor="dim"
        >
          <Box paddingX={1}>
            <Text dimColor bold>
              Related addresses:
            </Text>
          </Box>
          <Box paddingX={2} flexDirection="column">
            {...spinners}
          </Box>
        </Box>
      )}
      {body}
    </Box>
  );
};
