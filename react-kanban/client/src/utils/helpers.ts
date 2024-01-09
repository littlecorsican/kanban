import { base } from '../constants'

export const request = async(url: string, type: string = "GET", body: object|null = null) => {
    if (type === "GET") {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            //global_context.setLoading(false);
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            if (!response.ok) {
                return {
                success: false,
                message: "error"
                }
            }
    } else if (type === "POST") {
        const response = await fetch(url , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            });
            //global_context.setLoading(false);
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            if (!response.ok) {
                return {
                success: false,
                message: "error"
                }
            }
    }
}