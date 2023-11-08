This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



npx sequelize-cli db:migrate



const CardContent=(props: Task)=> {

    const { id, title, image, due_date, tags } = props

    const authData_string = localStorage.getItem(DIRECTUS_TOKEN_LOCALSTORAGE_KEY)
    let access_token = ""
    if (authData_string !== null) {
        const authData_JSON = JSON.parse(authData_string) as unknown;
        access_token = authData_JSON.access_token

    }

    return <div 
        className="bg-gray-200 rounded-md p-2 mb-2 shadow-md relative"
        >
            <div className="">
                <div className="p-2">{id}</div>
                <div className="p-2" >{title}</div>
                <div>
                    {tags && tags.map((value)=>{
                        return <div 
                            className="absolute top-[0] right-[0] m-4 text-white bg-red-600
                            p-1 rounded font-bold">
                                {value.toUpperCase()}
                            </div>
                    })}
                </div>
            </div>
            {image != null && <div>
                <img src={`${baseUrl}${image.toString()}?access_token=${access_token}`} />
                </div>}
            <div>Due Date : {due_date ? due_date.toString() : null}</div>
    </div>
}
