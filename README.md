<h1 align="center">
    <a href="https://github.com/ODGodinho">
        <img
            src="https://raw.githubusercontent.com/ODGodinho/Stanley-TheTemplate/main/public/images/Stanley.jpg"
            alt="Stanley Imagem" width="500"
        />
    </a>
    <br />
    ODG Request Message Interface
    <br />
</h1>

<h4 align="center">Request Message Interface 🔗!</h4>

<p align="center">

[![Stargazers](https://img.shields.io/github/stars/ODGodinho/ODGMessage?color=F430A4)](https://github.com/ODGodinho/ODGMessage/stargazers)
[![Made by ODGodinho](https://img.shields.io/badge/made%20by-ODGodinho-%2304A361)](https://www.linkedin.com/in/victor-alves-odgodinho/)
[![Forks](https://img.shields.io/github/forks/ODGodinho/ODGMessage?color=CD4D34)](https://github.com/ODGodinho/ODGMessage/network/members)
![Repository size](https://img.shields.io/github/repo-size/ODGodinho/ODGMessage)
[![GitHub last commit](https://img.shields.io/github/last-commit/ODGodinho/ODGMessage)](https://github.com/ODGodinho/ODGMessage/commits/master)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)

</p>

# Table of Contents

- [🎇 Benefits](#-benefits)
- [📗 Libraries](#-libraries)
- [📁 Dependencies](#-dependencies)
- [⏩ Get Started](#-get-started)
  - [🔘 Add dependencies](#-add-dependencies)
  - [💻 Usage](#-usage)
  - [📰 Example Implements](#-example-implements)
  - [🧪 Teste Code](#-teste-code)

---

## 🎇 Benefits

- 👀 Inversion of control (IoC)
- 🎇 Dependency Injection (DI)
- 🚨 Over 300 rules for pattern, possible errors and errors in Linter

## 📗 Libraries

- [Node.js 16](https://nodejs.org/?n=dragonsgamers)
- [Typescript](https://www.typescriptlang.org/?n=dragonsgamers)
- [Eslint](https://eslint.org/?n=dragonsgamers)
- [ODG-Linter-JS](https://github.com/ODGodinho/ODG-Linter-Js?n=dragonsgamers)
- [EditorConfig](https://editorconfig.org/?n=dragonsgamers)
- [ReviewDog](https://github.com/reviewdog/action-eslint)

## 📁 Dependencies

- [Node.js](https://nodejs.org) 16 or later
- [Yarn](https://yarnpkg.com/) Optional/Recommended
- [ODG TsConfig](https://github.com/ODGodinho/tsconfig) Last Version
- [ODG Exception](https://github.com/ODGodinho/ODGException) Last Version

## ⏩ Get Started

---

### 🔘 Add dependencies

```powershell
yarn add @odg/message
```

### 💻 Usage

> for use axios implementation [click here](https://github.com/ODGodinho/ODGAxios)

```typescript
class Test {

    public constructor(private readonly requester: MessageInterface) {
    }

    public async example(): ResponseInterface<any, any> {
        return this.requester.request({
            url: "https://google.com",
        });
    }

}
```

#### 📰 Example Implements

```typescript
import axios, {
    type AxiosInstance,
    type AxiosResponse,
    type AxiosResponseHeaders,
} from "axios";

import {
    type HttpHeadersInterface,
    type InterceptorManager,
    type RequestInterface ,
    type MessageInterface,
    type ResponseInterface,
    MessageException,
} from "@odg/message";

export class AxiosMessage<RequestData, ResponseData> implements MessageInterface<RequestData, ResponseData> {

    public interceptors: {
        request: InterceptorManager<RequestInterface<RequestData>>;
        response: InterceptorManager<ResponseInterface<RequestData, ResponseData>>;
    };

    private readonly client: AxiosInstance;

    public constructor() {
        this.client = axios.create();
        // this.interceptors = implements;
    }

    public async request<
        RequestD = RequestData,
        ResponseD = ResponseData,
    >(config: RequestInterface<RequestD>): Promise<ResponseInterface<RequestD, ResponseD>> {
        try {
            const response = await this.client.request<ResponseD, AxiosResponse<ResponseD, RequestD>, RequestD>(config);

            return {
                data: response.data,
                status: response.status,
                headers: response.headers,
                request: response.config,
            };
        } catch (error: unknown) {
            throw new MessageException("Example");
        }
    }
}
```

## 🧪 Teste Code

To Test execute this command

```bash
yarn test
# or
yarn test:watch
```
