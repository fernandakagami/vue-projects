export async function searchAddress(cep: string) {        
    try {        
        const address = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        return await address.json();                       
    } catch(erro) {
        return;
    }
}