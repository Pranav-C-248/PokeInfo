import eel
import requests
import sys, io

buffer = io.StringIO()
sys.stdout = sys.stderr = buffer

base_url='https://pokeapi.co/api/v2/pokemon/'
eel.init('frontend')


page=0



@eel.expose
def nextPage():
    global page
    page+=10
    return get_pokemon_list()

@eel.expose
def previousPage():
    global page
    if page<10:
        page=0
    else:
        page-=10
    return get_pokemon_list()
@eel.expose
def get_pokemon_list():
    global page
    data=requests.get(base_url+f"?limit={10}&offset={page}")
    if data.status_code==200:
        data=data.json()
        results=data['results']
        pokemonList=[]
        
        for i in range (len(results)):
            pokemonList.append(results[i]['name'])
        return pokemonList

@eel.expose
def get_pokemon_details(pokemon_name):
    
    url=f"{base_url}{pokemon_name}"
    data=requests.get(url)
    if data.status_code==200:
        data=data.json()
        info={
            "name":data["name"],
            "height":data["height"],
            "weight":data["weight"],
            "default": data["sprites"]["front_default"],
            "shiny":data["sprites"]["front_shiny"]

        }
        return info
    
    else:
        return None

if __name__ == '__main__':
    eel.start('index.html', size=(700, 500))
