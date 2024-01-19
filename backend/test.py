import requests


base_url='https://pokeapi.co/api/v2/pokemon/greninja'

data=requests.get(base_url)
data=data.json()


print(data)