interface JsonObject {
    [member: string]: JsonArray | JsonObject | boolean | null | number | string;
}
type JsonArray = Array<
    JsonArray | JsonObject | boolean | null | number | string
>;
type Json = JsonArray | JsonObject | boolean | null | number | string;

export { Json, JsonArray, JsonObject };
