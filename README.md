> ⚠️ **Archived Project**
>
> This repository has been **archived** and is no longer actively maintained.  
> The project has been migrated to a **monorepo**.
>
> 👉 **New repository:** https://github.com/ODGodinho/ODGMono
>
> Please update your references and use the monorepo for the latest code and updates.

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

[![codecov](https://codecov.io/gh/ODGodinho/ODGMessage/branch/main/graph/badge.svg?token=JCLIEK2OFN)](https://codecov.io/gh/ODGodinho/ODGMessage)
[![Stargazers](https://img.shields.io/github/stars/ODGodinho/ODGMessage?color=F430A4)](https://github.com/ODGodinho/ODGMessage/stargazers)
[![Made by ODGodinho](https://img.shields.io/badge/made%20by-ODGodinho-%2304A361)](https://www.linkedin.com/in/victor-alves-odgodinho/)
[![Forks](https://img.shields.io/github/forks/ODGodinho/ODGMessage?color=CD4D34)](https://github.com/ODGodinho/ODGMessage/network/members)
![Repository size](https://img.shields.io/github/repo-size/ODGodinho/ODGMessage)
[![GitHub last commit](https://img.shields.io/github/last-commit/ODGodinho/ODGMessage)](https://github.com/ODGodinho/ODGMessage/commits/master)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)
[![StyleCI](https://github.styleci.io/repos/577124284/shield?branch=main)](https://github.styleci.io/repos/577124284?branch=main)

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
- 🚨 Over 800 rules for pattern, possible errors and errors in Linter

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
import { type MessageInterface, type MessageResponse } from "@odg/message";

class Test {

    public constructor(private readonly requester: MessageInterface) {
    }

    public async example(): Promise<MessageResponse<any, any>> {
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
} from "axios";

import {
    type HttpHeadersInterface,
    type InterceptorsInterface,
    type MessageInterface,
    type RequestInterface,
    type ResponseInterface,
    MessageException,
    MessageResponse,
} from "@odg/message";

export class AxiosMessage<RequestData, ResponseData> implements MessageInterface<RequestData, ResponseData> {

    public interceptors: {
        request: InterceptorManager<RequestInterface<RequestData>>;
        response: InterceptorManager<MessageResponse<RequestData, ResponseData>>;
    }

    private readonly client: AxiosInstance;

    private defaultOptions: Partial<RequestInterface<RequestData>> = {};

    public constructor(client?: AxiosInstance) {
        this.client = client ?? axios.create();
    }

    public getDefaultOptions(): Partial<RequestInterface<RequestData>> {
        return { ...this.defaultOptions };
    }

    public setDefaultOptions(config: Partial<RequestInterface<RequestData>>): this {
        this.defaultOptions = { ...this.defaultOptions, ...config };

        return this;
    }

    public async request<
        RequestD = RequestData,
        ResponseD = ResponseData,
    >(config: RequestInterface<RequestD>): Promise<MessageResponse<RequestD, ResponseD>> {
        try {
            const response = await this.client.request<ResponseD, AxiosResponse<ResponseD, RequestD>, RequestD>(config);

            const body: ResponseInterface<ResponseD> = {
                data: response.data,
                status: response.status,
                headers: response.headers as HttpHeadersInterface,
            };

            return new MessageResponse(
                response.config as RequestInterface<RequestD>,
                body,
            );
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
