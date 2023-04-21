export const getTest = async () => {
    try {
        const res = await fetch("http://localhost:8080/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (err) {
        
    }
};

export const signup = async (data) => {
    try {
        console.log(data);
        const res = await fetch("http://localhost:8080/sign-up", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

export const signin = async (data) => {
    try {
        console.log(data);
        const res = await fetch("http://localhost:8080/sign-in", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(!res.ok) {
            return console.log('error');
        }
        return await res.json();
        
    } catch (err) {
        console.log(err);
    }
};