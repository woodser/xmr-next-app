import moneroTs from "monero-ts";

const myApp = async () => {

    // connect to daemon rpc
    console.log("Connecting to daemon RPC");
    let daemonRpc = await moneroTs.connectToDaemonRpc({
      uri: "http://localhost:28081",
      username: "rpc_user",
      password: "abc123",
      rejectUnauthorized: false
    });
    console.log("Daemon RPC height: " + await daemonRpc.getHeight());

    // connect to wallet RPC
    console.log("Connecting to wallet RPC");
    let walletRpc = await moneroTs.connectToWalletRpc({
      uri: "http://localhost:28084",
      username: "rpc_user",
      password: "abc123",
      rejectUnauthorized: false
    });
    //await walletRpc.openWallet("test_wallet_1", "supersecretpassword123");
    console.log("Wallet RPC seed: " + await walletRpc.getSeed());

    // create offline full wallet
    let walletFull = await moneroTs.createWalletFull({
      //path: GenUtils.getUUID(), // in-memory wallet if not given
      password: "supersecretpassword123",
      networkType: moneroTs.MoneroNetworkType.STAGENET,
    });
    console.log("Created full wallet with seed: " + await walletFull.getSeed());

    console.log("Done running XMR sample app");
    return true;
}

export default myApp;