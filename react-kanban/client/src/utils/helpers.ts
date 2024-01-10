import { base } from '../constants'


export const request = async(url: string, type: string = "GET", body: string|null = null) => {

    const credentials = localStorage.getItem('user_credentials')
    let access_token = ""
    if (credentials) {
        access_token = JSON.parse(credentials).access_token
    }
    
    if (type === "GET") {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${access_token}`
            },
            });
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            return response2
    } else if (type === "POST") {
        const response = await fetch(url , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${access_token}`
            },
            body: body,
            });
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            return response2
    } else if (type === "PUT") {
        const response = await fetch(url , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${access_token}`
            },
            body: body,
            });
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            return response2
    } else if (type === "DELETE") {
        const response = await fetch(url , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${access_token}`
            },
            body: body,
            });
            console.log('response', response)
            const response2 = await response.json()
            console.log('response2', response2)
            return response2
    }
}