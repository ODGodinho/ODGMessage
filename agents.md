# ODG Message - Consumer Guide

## 🎯 Purpose

- Padronizar contratos TypeScript de request/response para clientes HTTP/mensageria.
- Permitir que apps consumam uma implementação própria via `MessageInterface`.
- Fornecer tipos de erro e type guards unificados para tratamento de falhas.

## 📜 Contracts

- Entrada principal exporta: tipos de `./interfaces`, `MessageResponse`, `MessageException`, `MessageUnknownException`, `ODGMessage`, `Methods`, `CacheableLookup`.
- Contrato central: `MessageInterface<RequestData, ResponseData>` com `request`, `interceptors`, `getDefaultOptions`, `setDefaultOptions`.
- Request: `RequestInterface`, `RequestOptionsParametersInterface`, `ParametersInterface`, `ProxyConfigInterface`.
- Response: `ResponseInterface`, `ResponseType`, `HttpHeadersInterface`, `MessageResponse`.
- Interceptors: `InterceptorsInterface`, `InterceptorManager`, `onFulfilledType`, `onRejectedType`.
- DNS cache opcional: `CacheableLookupConfig`, `LookupCacheType`, `LookupKeyType`, `LookupPromiseResult`.

## 🚦 Rules (Usage)

- Consumir pela API do pacote `@odg/message`; não importar caminhos internos.
- Tipar chamadas com `MessageInterface<Req, Res>` e `RequestInterface<Req>`.
- Usar `Methods` para padronizar verbos HTTP no campo `method`.
- Em interceptors, persistir o id retornado por `use(...)` para remoção com `eject(id)`.
- Para tratamento seguro de `unknown`, usar `ODGMessage.isMessage(...)` ou `ODGMessage.isMessageError(...)`.
- Ao usar `CacheableLookup`, fornecer uma implementação compatível com `CacheInterface<LookupCacheType>`.

## 💥 Exceptions

- `MessageException<RequestData, ResponseData>`: erro de integração/transporte que inclui `message`, `code`, e opcionalmente `request`/`response`.
- `MessageUnknownException<RequestData, ResponseData>`: erro não mapeado conhecido pela camada de mensagem, com mesma estrutura de contexto.
- Quando há `request` e `response`, ambas oferecem `getMessage(): MessageResponse | undefined`.
- Tratamento recomendado: capturar `unknown`, validar com `ODGMessage.isMessageError`, então usar `message`, `code` e `getMessage()` quando disponível.

## ⚠️ Integration Pitfalls

- `getMessageResponse()` nas exceptions retorna `MessageResponse` opcional caso não tenha `request` ou `response`.
- `method` aceita `Methods | string`; valores fora do padrão podem passar na tipagem e falhar no cliente concreto.
- `RequestInterface` possui campos opcionais amplos; dependências de validação ficam no implementador concreto.
- `CacheableLookup` depende de `@odg/cache`; exceptions dependem de `@odg/exception` quando esses recursos forem usados.
