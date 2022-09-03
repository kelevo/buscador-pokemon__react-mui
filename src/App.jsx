import { Chip, Container, List } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import pokeApi from "./api/pokemons";
import './App.css';
import { Searcher } from "./components/Search/Search";

const App = () => {

  const [inputPokemon, setInputPokemon] = useState('ditto');
  const [errorNotFoundPokemon, setErrorNotFoundPokemon] = useState( false );
  const [dataPokemon, setDataPokemon] = useState( null );

  useEffect(() => {

    serchInfoUser( inputPokemon )

  }, [ inputPokemon ])

  const serchInfoUser = async ( pokemon ) => {
    setDataPokemon( null )
    setErrorNotFoundPokemon( false );

    try {

      const pokemonResponse = await pokeApi.get( pokemon );
      setDataPokemon( pokemonResponse );

    } catch (error) {

      setErrorNotFoundPokemon( true );

    }

  }

  return (
    <Container className="contenedor-padre" sx={{
      width: '80vw',
      height: '86vh',
      borderRadius: '20px',
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '40px'
    }}
    >
      <Searcher setInputUser={ setInputPokemon } />
      {
        errorNotFoundPokemon
          ?  <>
              <Container className="contenedor-general-center">
                <span className="titulo-name"> Pokemon no encontrado, intentalo nuevamente </span>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/158.svg" />
              </Container>
            </>
          :  <>
              <Container className="contenedor-general">
                {
                  (dataPokemon !== null)
                    ?  <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <img
                            className="img_principal"
                            src={ dataPokemon.data.sprites?.other?.dream_world?.front_default }
                          />
                          <Grid container spacing={1}>
                            <Grid item xs={4}>
                              <img
                                className="img_principal"
                                src={ dataPokemon.data.sprites.front_default }
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <img
                                className="img_principal"
                                src={ dataPokemon.data.sprites.back_default }
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <img
                                className="img_principal"
                                src={ dataPokemon.data.sprites.front_shiny }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <div className="contenedor-informacion">
                              <span className="titulo-name"> <strong>Name:</strong> { dataPokemon.data.name } </span>
                              <br />
                              <br />
                              <p className="subtitulo">Abilities</p>
                              <List>
                                {
                                  dataPokemon.data.abilities.map( abilitie => (
                                    <Chip className="chip" label={ abilitie.ability.name } variant="outlined" />
                                  ))
                                }
                              </List>
                              <p className="subtitulo">Stats</p>
                              <div>
                                {
                                  dataPokemon.data.stats.map( stat => (
                                    <Chip className="chip" label={ stat.stat.name } variant="outlined" />
                                  ))
                                }
                              </div>
                            </div>
                        </Grid>
                      </Grid>
                    :  <Container className="contenedor-general-center">
                        <img src="/public/pokebolaLoading.gif" />
                      </Container>
                }
              </Container>
            </>
      }
    </Container>
  )
}

export default App;