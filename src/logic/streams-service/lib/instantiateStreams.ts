let streams: any

import("./streams").then(async (streamsClient) => {
    await streamsClient.init();
    streams = streamsClient;
    streams.to_bytes = to_bytes;
    streams.from_bytes = from_bytes;
    streams.set_panic_hook();
});


function to_bytes(string: string) {
    var bytes = [];
    for (var i = 0; i < string.length; ++i) {
        bytes.push(string.charCodeAt(i));
    }
    return bytes;
}

function from_bytes(bytes: number[]) {
    var string = "";
    for (var i = 0; i < bytes.length; ++i) {
        string += String.fromCharCode(bytes[i]);
    }
    return string;
}

export async function instantiateStreams(): Promise<any> {
    if(streams === undefined) {
        await new Promise(r => setTimeout(r, 2000));
        return instantiateStreams()
    }

    streams.from_bytes = from_bytes
    streams.to_bytes = to_bytes

    return new Promise(resolve => {
        resolve(streams)
    })
}
