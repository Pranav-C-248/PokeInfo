import eel
import requests

base_url='https://pokeapi.co/api/v2/pokemon/'

eel.init('frontend')

@eel.expose
def get_pokemon_list():
    data=requests.get(base_url)
    if data.status_code==200:
        print("Status Code: ",data.status_code)
        print("Fetching pokemon list")
        data=data.json()
        results=data['results']
        pokemonList=[]
        
        for i in range (len(results)):
            pokemonList.append(results[i]['name'])
        return pokemonList

@eel.expose
def get_pokemon_details(pokemon_name):
    
    print(f"Fetching data on {pokemon_name}...")
    url=f"{base_url}{pokemon_name}"
    data=requests.get(url)
    if data.status_code==200:
        data=data.json()
        info={
            "name":data["name"],
            "height":data["height"],
            "weight":data["weight"],

        }
        return info
    
    else:
        return None

if __name__ == '__main__':
    eel.start('index.html', size=(700, 500))
