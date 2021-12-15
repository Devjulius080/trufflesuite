import React from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";

type StatusSpinnersProps = {
  statusByAddress: string[];
};

export const StatusSpinners = ({ statusByAddress }: StatusSpinnersProps) => {
  if (!statusByAddress) return null;

  return (
    <Box>
      {Object.entries(statusByAddress).map(([address, status]) => {
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
      })}
    </Box>
  );
};

type SpinnerType = {
  address: string;
};

export const FailedStatusSpinner = ({ address }: SpinnerType) => {
  return (
    <Box key={`address-${address}`}>
      <Box paddingLeft={1} paddingRight={1}>
        <Text dimColor color="yellow">
          ⚠
        </Text>
      </Box>
      <Text dimColor bold>
        {address}
      </Text>
      <Text dimColor color="red">
        {" "}
        ::{" "}
      </Text>
      <Text dimColor color="gray">
        Could not find
      </Text>
    </Box>
  );
};

export const OkStatusSpinner = ({ address }: SpinnerType) => {
  return (
    <Box key={`address-${address}`}>
      <Box paddingLeft={1} paddingRight={1}>
        <Text dimColor color="green">
          ✓
        </Text>
      </Box>
      <Text dimColor bold>
        {address}
      </Text>
      <Text dimColor color="red">
        {" "}
        ::{" "}
      </Text>
      <Text dimColor color="gray">
        OK
      </Text>
    </Box>
  );
};

export const FetchingStatusSpinner = ({ address }: SpinnerType) => {
  return (
    <Box key={`address-${address}`}>
      <Box paddingLeft={1} paddingRight={1}>
        <Text dimColor color="green">
          <Spinner />
        </Text>
      </Box>
      <Text dimColor bold>
        {address}
      </Text>
      <Text dimColor color="red">
        {" "}
        ::{" "}
      </Text>
      <Text dimColor color="gray">
        Fetching external...
      </Text>
    </Box>
  );
};

export const QueryStatusSpinner = ({ address }: SpinnerType) => {
  return (
    <Box key={`address-${address}`}>
      <Box paddingLeft={1} paddingRight={1}>
        <Text dimColor color="green">
          <Spinner />
        </Text>
      </Box>
      <Text dimColor bold>
        {address}
      </Text>
      <Text dimColor color="red">
        {" "}
        ::{" "}
      </Text>
      <Text dimColor color="gray">
        Querying @truffle/db...
      </Text>
    </Box>
  );
};
