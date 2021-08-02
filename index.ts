/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
import "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/tampermonkey/index.d.ts";
declare let unsafeWindow: Window & Record<string, unknown>;

type KeichoResponse = {
  text: string;
  buttons: string[];
  // deno-lint-ignore camelcase
  can_input: string[];
};

unsafeWindow.askKeicho = async (text: string, { id }: { id?: string } = {}) => {
  // idがないときは新規に生成する
  if (!id) {
    id = await new Promise<string>((resolve, reject) =>
      GM_xmlhttpRequest({
        method: "GET",
        url: "https://keicho.herokuapp.com/api/web/create/?mode=normal",
        onload: ({ responseText }) => resolve(responseText),
        onerror: (e) => reject(e),
      })
    );
  }
  return await new Promise<
    KeichoResponse & { id: string }
  >((resolve, reject) =>
    GM_xmlhttpRequest<KeichoResponse>({
      method: "POST",
      url: "https://keicho.herokuapp.com/api/web/",
      data: JSON.stringify({
        talk: id,
        text,
        user: "nobody",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      onload: ({ response }) => resolve({ id, ...response }),
      responseType: "json",
      onerror: (e) => reject(e),
    })
  );
};
