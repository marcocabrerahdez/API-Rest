# Informe: Práctica 12 - API Node/Express de gestión de información musical

## Introducción

En este ejercicio, haremos uso de distintas herramienta con el objetivo final de contar con un programa sencillo, a la vez que funcional, que nos permita realizar operaciones de **creación, lectura, modificación y borrado** (las famosas operaciones **CRUD**) sobre canciones, artistas y playlists.

Queremos, por lo tanto, conseguir una aplicación con la que se pueda crear, modificar, borrar o simplemente obtener información musical de una base de datos. Una apuesta simple, con una serie de desafíos, que nos dará como recompensa la posibilidad de gestionar fácilmente nuestra propia librería de música digital.

Es nuestro honor presentar **MusicTronik360**,  nuestra propuesta, creada para el usuario e inspirada en nuestro primer proyecto de digitalización de música, **Musitronic360**.

<br>

# MusicTronik360

## Kit de herramientas
> ¿Con qué vamos a trabajar?

<br>

- **Express**&emsp;⟶&emsp;Framework Web para Node.js que nos facilitará la creación de un servidor.
- **Chai HTTP**&emsp;⟶&emsp;Módulo que nos permitirá integrar HTTP en el testeo mediante Chai.
- **MongoDB**&emsp;⟶&emsp;Módulo que nos ofrece la capacidad de construir nuestra propia base de datos no relacional. Se basa en colecciones de documentos (objetos JSON).
- **Mongoose**&emsp;⟶&emsp;Módulo para elaborar el esquema de nuestra base de datos, definiendo desde un principio los distintos objetos que podrán gestionarse (canciones, artistas y playlists) y sus atributos.
- **Heroku**&emsp;⟶&emsp;Plataforma en la que podremos desplegar la API.

<br>

# Canciones, artistas y playlists
> Bocetos y planos de nuestra fortaleza

Partimos desde la base de que tanto 'canciones' como 'artistas' y 'playlists' serán objetos JSON. Estos estarán constituidos por una serie de atributos. Explicamos a continuación la estructura de cada uno.

- **Cancion *[song]***
  - **name: _string_**&emsp;⟶&emsp;Nombre de la canción
  - **author: _string_**&emsp;⟶&emsp;Autor de la canción
  - **length: _number_**&emsp;⟶&emsp;Duración de la canción
  - **genres: _string[]_**&emsp;⟶&emsp;Género(s) al que pertenece
  - **single: _bool_**&emsp;⟶&emsp;Flag que determina si la canción fue lanzada como single o no
  - **plays: _number_**&emsp;⟶&emsp;Número de reproducciones totales

<br>

- **Artista *[artist]***
  - **name: _string_**&emsp;⟶&emsp;Nombre del artista
  - **genres: _string[]_**&emsp;⟶&emsp;Género(s) musicales relacionados
  - **songs: _string[]_**&emsp;⟶&emsp;Canciones publicadas
  - **audience: _number_**&emsp;⟶&emsp;Cantidad de oyentes mensuales

  <br>

- **Playlist *[playlist]***
  - **name: _string_**&emsp;⟶&emsp;Nombre de la playlist
  - **songs: _string[]_**&emsp;⟶&emsp;Canciones incluidas
  - **length: _number_**&emsp;⟶&emsp;Duración de playlist
  - **genres: _string[]_**&emsp;⟶&emsp;Género(s) musicales que se incluyen dentro de la playlist

  <br>

  ### Desarrollo del esquema
  ---
  Sabiendo la estructura de los objetos y el tipo de los atributos, se procede a preparar el esquema de nuestra base de datos. Así quedan definidos los tres tipos de objetos:

  ## · Song

  > Esquema básico de una canción

        const SongSchema = new Schema({
        name: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          validate: (value: string) => {
            if (!value.match(/^[A-Z]/)) {
              // eslint-disable-next-line max-len
              throw new Error('Los nombres de las canciones deben empezar en mayúscula');
            }
          },
        },
        author: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          validate: (value: string) => {
            if (!value.match(/^[A-Z]/)) {
              // eslint-disable-next-line max-len
              throw new Error('Los nombres de los artistas deben empezar en mayúscula');
            }
          },
        },
        length: {
          type: Number,
          required: true,
          trim: true,
          validate: (value: number) => {
            if (value < 0) {
              throw new Error('La duración no puede ser negativa');
            }
          },
        },
        genres: {
          type: [String],
          required: true,
          trim: true,
          validate: (value: string[]) => {
            if (value.length === 0) {
              throw new Error('La canción debe tener al menos un genero');
            } else {
              value.forEach((element) => {
                if (!element.match(/^[A-Z]/)) {
                  // eslint-disable-next-line max-len
                  throw new Error('Los géneros de la canción deben empezar en mayúscula');
                }
              });
            }
          },
        },
        single: {
          type: Boolean,
          required: true,
          trim: true,
          validate: (value: boolean) => {
            if (typeof value !== 'boolean') {
              throw new Error('Single es true or false');
            }
          },
        },
        plays: {
          type: Number,
          required: true,
          trim: true,
          validate: (value: number) => {
            if (value < 0) {
              throw new Error('Las reproducciones no pueden ser negativas');
            }
          },
        },
      });  

Cada atributo tiene indicado su tipo tal y como se ha explicado con anterioridad. Además hacemos que todos los atributos sean obligatorios con 'required: true'. Por último, para cada atributo colocamos una función anónima de validación (nos indicará si algún valor introducido al construir un objeto no corresponde con la estructura planeada). 

Por ejemplo, nos aseguramos de que los nombres de los géneros empiecen por mayúscula, para mantener una coherencia con respecto a los datos de nuestro sistema. Además, un factor importante de los validadores (se repite en los tres tipos de objetos) es que las arrays no podrán ser vacías. No tiene sentido que una playlist no tenga canciones, o que una canción no tenga géneros musicales asociados.

De forma muy similar se definen los esquemas de un objeto *artist* y un objeto *playlist* respectivamente:

<br>

## · Artist

> Esquema básico de un artista

      const ArtistSchema = new Schema({
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: (value: string) => {
          if (!value.match(/^[A-Z]/)) {
            // eslint-disable-next-line max-len
            throw new Error('Los nombres de los artistas deben empezar en mayúscula');
          }
        },
      },
      genres: {
        type: [String],
        required: true,
        trim: true,
        validate: (value: string[]) => {
          if (value.length === 0) {
            throw new Error('El artista debe tener al menos un género');
          } else {
            value.forEach((element) => {
              if (!element.match(/^[A-Z]/)) {
                // eslint-disable-next-line max-len
                throw new Error('Los géneros del artista deben empezar en mayúscula');
              }
            });
          }
        },
      },
      songs: {
        type: [String],
        required: true,
        trim: true,
        validate: (value: string[]) => {
          if (value.length === 0) {
            throw new Error('El artista debe tener al menos una cancion');
          } else {
            value.forEach((element) => {
              if (!element.match(/^[A-Z]/)) {
                // eslint-disable-next-line max-len
                throw new Error('Las canciones deben empezar en mayúscula');
              }
            });
          }
        },
      },
      audience: {
        type: Number,
        required: true,
        trim: true,
        validate: (value: number) => {
          if (value < 0) {
            throw new Error('Los oyentes mensuales no pueden ser negativos');
          }
        },
      },
    });


<br>

## · Playlist

> Esquema básico de una playlist

    const PlaylistSchema = new Schema({
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: (value: string) => {
          if (!value.match(/^[A-Z]/)) {
            // eslint-disable-next-line max-len
            throw new Error('El nombre de la playlist debe empezar en mayúscula');
          }
        },
      },
      songs: {
        type: [String],
        required: true,
        trim: true,
        validate: (value: string[]) => {
          if (value.length === 0) {
            throw new Error('La playlist debe tener al menos una cancion');
          } else {
            value.forEach((element) => {
              if (!element.match(/^[A-Z]/)) {
                // eslint-disable-next-line max-len
                throw new Error('Las canciones deben empezar en mayúscula');
              }
            });
          }
        },
      },
      length: {
        type: Number,
        required: true,
        trim: true,
        validate: (value: number) => {
          if (value < 0) {
            throw new Error('La duración no puede ser negativa');
          }
        },
      },
      genres: {
        type: [String],
        required: true,
        trim: true,
        validate: (value: string[]) => {
          if (value.length === 0) {
            throw new Error('La playlist debe tener al menos un genero');
          } else {
            value.forEach((element) => {
              if (!element.match(/^[A-Z]/)) {
                // eslint-disable-next-line max-len
                throw new Error('Los géneros de la canción deben empezar en mayúscula');
              }
            });
          }
        },
      },
    });

<br>

# Rutas y peticiones
> Los mapas del castillo

Con nuestra API desplegada en Heroku, podremos realizar las operaciones CRUD a través de las distintas peticiones que hemos diseñado. ¿Cuáles son? ¿Por qué rutas se canalizan?

Aquí explicaremos el mapa de todas las operaciones que se pueden realizar y las rutas asociadas a los distintos objetos.

La URL raíz es&emsp;⟶&emsp;https://musictronik360.herokuapp.com/

A partir de ella, podremos realizar:
- **POST**&emsp;[ Añadir un objeto ]
- **GET**&emsp;[ Obtener un objeto ]
- **PATCH**&emsp;[ Modificar un objeto ]
- **DELETE**&emsp;[ Eliminar un objeto ]

**Rutas:** 
- Song &emsp;⟶&emsp; https://musictronik360.herokuapp.com/song
- Artist &emsp;⟶&emsp; https://musictronik360.herokuapp.com/artist
- Playlist &emsp;⟶&emsp; https://musictronik360.herokuapp.com/playlist

Para encontrar un objeto de la base de datos podemos acceder a él buscándolo por su nombre pero, si queremos asegurarnos que encontraremos un solo resultado (dos canciones pueden tener el mismo título), lo mejor que podemos hacer es buscar el objeto a través de su identificador. Para ello, se han preparado las siguientes rutas:

**Rutas (id):** 
- Song &emsp;⟶&emsp; https://musictronik360.herokuapp.com/song/:id
- Artist &emsp;⟶&emsp; https://musictronik360.herokuapp.com/artist/:id
- Playlist &emsp;⟶&emsp; https://musictronik360.herokuapp.com/playlist/:id

Donde ':id' se sustituye con el identificador específico del objeto a tratar.

Se muestran los dos ejemplos, primero una búsqueda de la canción por su título 'Song' y otra búsqueda usando su id.

- Nombre: https://musictronik360.herokuapp.com/song?name=Song
- Id: https://musictronik360.herokuapp.com/song/6280ed4b8ef8200016a24554


<br>

### **Pero, ¿cómo se han implementado las operaciones?**<br> 
\> **_Procedemos a responder esa pregunta_**

<br>

# Operaciones CRUD
> Los pasillos del templo

Vamos a explicar la solución que nos ha permitido realizar cada una de las operaciones CRUD (POST, GET, PATCH y DELETE). No obstante, cabe destacar que aunque los tres tipos de objetos tengan distintos atributos, al final **la forma de manejarlos será idéntica.** 

Por esto, se explicará la solución para cada operación usando de ejemplo el caso de 'song', sabiendo que tanto 'artist' como 'playlist' cuentan con funciones idénticas aunque adaptadas a sus respectivas rutas y atributos.

---

## Post
> Publicar un objeto

    postRouter.post('/song', async (req, res) => {
      const song = new Song(req.body);

      try {
        await song.save();
        res.status(201).send(song);
      } catch (error) {
        res.status(400).send(error);
      }
    });

Utilizamos el 'body' de la Request para crear una nueva canción con los valores indicados en sus atributos (deberá satisfacer el esquema que hemos implementado previamente). 

Luego, guardamos en la base de datos la canción mediante el método save() y enviamos un mensaje de estado '200' (éxito), así como la propia canción para poder confirmar los datos que se han insertado.

En caso de error, se envía un error y un mensaje de estado '400' (error).

*! Una vez publicado el objeto en la base de datos, se le asignará una **id** automáticamente, que será única en el sistema. La podremos utilizar para realizar operaciones como veremos a continuación.*

---

## Get
> Encontrar el objeto a través de su atributo 'name'

    getRouter.get('/song', async (req, res) => {
      const filter = req.query.name?{name: req.query.name.toString()}:{};

      try {
        const song = await Song.find(filter);
        if (song.length !== 0) {
          res.status(200).send(song);
        }
        return res.status(404).send();
      } catch (error) {
        return res.status(500).send();
      }
    });

Generamos un filtro utilizando el valor entregado como nombre en la query string. Lo almacenamos en la constante 'filter' y esta la utilizamos finalmente a través del método find().

Si encontramos alguna canción coincidente, se devolverá un mensaje de estado '200' (éxito), además de enviar la canción encontrada mediante la función send().

Si no encontramos ninguna, se devolverá un mensaje de estado '404' (error, elemento no encontrado).

## Get by ID
> Encontrar el objeto a través de su identificador

    getRouter.get('/song/:id', async (req, res) => {
      try {
        const song = await Song.findById(req.params.id);
        if (!song) {
          return res.status(404).send();
        }
        return res.status(200).send(song);
      } catch (error) {
        return res.status(500).send();
      }
    });

Utilizamos la función 'findById()' pasándole como argumento el valor de id escrito en la query string.

Si encontramos alguna canción coincidente, se devolverá un mensaje de estado '200' (éxito), y se enviará la canción encontrada mediante el método send().

Si no encontramos ninguna, se devolverá un mensaje de estado '404' (error, elemento no encontrado).

---

## Patch
> Modificar el objeto a través de su atributo 'name'

    patchRouter.patch('/song', async (req, res) => {
      if (!req.query.name) {
        return res.status(400).send({
          error: 'A name must be provided',
        });
      }
      // eslint-disable-next-line max-len
      const allowedUpdates = ['name', 'author', 'length', 'genres', 'single', 'plays'];
      const actualUpdates = Object.keys(req.body);
      const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));

      if (!isValidUpdate) {
        return res.status(400).send({
          error: 'Update is not permitted',
        });
      }

      try {
        // eslint-disable-next-line max-len
        const song = await Song.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
          new: true,
          runValidators: true,
        });

        if (!song) {
          return res.status(404).send();
        }

        return res.send(song);
      } catch (error) {
        return res.status(400).send(error);
      }
    });

Si no se ha indicado un nombre en la query string, nos ahorramos la operación compleja y enviamos un mensaje de estado '400' (error) y un mensaje de error indicando que falta esa información.

Si existe un nombre, lo primero que hacemos es almacenar en una constante un array de strings, donde cada string corresponde a un atributo del esquema del objeto. Esta la usaremos justo después para verificar que la modificación solicitada corresponde a atributos válidos (los que están en el array). 

Si no es el caso, y no coinciden las claves solicitadas con las indicadas como válidas, devolvemos un mensaje de estado '400' (error).

De ser válida la modificación, se realiza mediante el método findOneAndUpdate(), indicando como argumento el nombre del objeto y el cuerpo con el nuevo contenido. Además, con 'new: true' indicamos que queremos recibir de respuesta el objeto modificado, no la versión antigua (así podremos comprobar que se ha cambiado según lo deseado).

Si al intentar encontrar una canción para modificar, nos topamos con que no existe ninguna canción, devolvemos un mensaje de estado '404' (error, elemento no encontrado).



## Patch by ID
> Modificar el objeto a través de su identificador

    patchRouter.patch('/song/:id', async (req, res) => {
      // eslint-disable-next-line max-len
      const allowedUpdates = ['name', 'author', 'length', 'genres', 'single', 'plays'];
      const actualUpdates = Object.keys(req.body);
      // eslint-disable-next-line max-len
      const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

      if (!isValidUpdate) {
        return res.status(400).send({
          error: 'Update is not permitted',
        });
      }

      try {
        // eslint-disable-next-line max-len
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!song) {
          return res.status(404).send();
        }
        return res.send(song);
      } catch (error) {
        return res.status(400).send(error);
      }
    });

Esta función es prácticamente idéntica a la anterior, salvo que aprovechando el haber enviado el identificador a través de la query string. Este cambio se ve reflejado en la llamada al método findByIdAndUpdate().

---

## Delete
> Eliminar el objeto a través de su atributo 'name'

    deleteRouter.delete('/song', async (req, res) => {
      if (!req.query.name) {
        res.status(400).send({
          error: 'A name must be provided',
        });
      }
      try {
        // eslint-disable-next-line max-len
        const song = await Song.findOneAndDelete(req.query.name?{name: req.query.name.toString()}:{});
        if (!song) {
          return res.status(404).send();
        }
        return res.send(song);
      } catch (error) {
        return res.status(400).send();
      }
    });

Si no se indica ningún nombre, se envía un mensaje de estado '400' (error) y se envía un mensaje de error avisando de que falta esa información para poder encontrar el objeto.

En otro caso, se utiliza el método findOneAndDelete() utilizando como argumento el nombre entregado en la query string.

Si no se encuentra ninguna canción, se envía un mensaje de estado '404' (error, elemento no encontrado).

Si efectivamente se ha encontrado y eliminado, se envía como respuesta la propia canción (por si se quiere confirmar qué canción ha sido eliminada de la base de datos).

## Delete by ID
> Eliminar el objeto a través de su identificador

    deleteRouter.delete('/song/:id', async (req, res) => {
      try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
          return res.status(404).send();
        }
        return res.send(song);
      } catch (error) {
        return res.status(400).send();
      }
    });

En este caso, al método findByIdAndDelete se le pasa como argumento el id.

Si no se encuentra ninguna canción con dicho Id, se envía un mensaje de estado '404' (error, elemento no encontrado).

Si, efectivamente, se encuentra y elimina alguna canción, se envía la propia canción como respuesta.

<br>

# Tests y expectativas
> Los vigías de la muralla

Hemos regado nuestro proyecto de pruebas para asegurarnos de su correcto funcionamiento a lo largo del desarrollo. Todas las pruebas han sido distribuidas en distintos ficheros, en el directorio /tests. Allí, cada fichero contiene las pruebas asociadas a una acción CRUD concreta (además, se ha dividido entre fichero para búsqueda por nombre y fichero para búsquedas por Id).

Dada la longitud de los tests, aumentada notablemente por la aparición de objetos JSON de prueba, se procede a explicarlo de la siguiente forma:

Se desplegará un árbol con todos los ficheros, donde se mostrará los 'describe' de cada uno y, dentro de cada, los 'it' que lo componen. Se explicará qué lógica sigue cada prueba.

- **post.spec.ts**
  - **Post request test**
    - **Should insert a song:** Se prueba a realizar una operación Post de una canción creada a mano en el propio test. 
    - **Should insert a artist:** Se prueba a realizar una operación Post de un artista creado a mano en el propio test. 
    - **Should insert a playlist:** Se prueba a realizar una operación Post de una playlist creada a mano en el propio test. 
- **get.spec.ts**
  - **Get request test**
    - **Get all the elements**
      - **Should get all songs:** Se prueba a hacer un Get sobre la url terminada en /song
      - **Should get all artists:** Se prueba a hacer un Get sobre la url terminada en /artist
      - **Should get all playlists:** Se prueba a hacer un Get sobre la url terminada en /playlist
    - **Get specfic song:** Se prueba a hacer un Get sobre una canción llamada 'Song' (Canción base que hemos creado)
    - **Get specfic artist:** Se prueba a hacer un Get sobre un artista llamado 'Pepe' (Artista base que hemos creado)
    - **Get specfic playlist:** Se prueba a hacer un Get sobre una playlist llamada 'Playlist1' (Playlist base que hemos creado)
- **getByID.spec.ts**
  - **Get request by id**
    - **Should get a specific song by id:** Se busca con Get utilizando el Id que tiene la canción 'Song' en la base de datos. Si el primer atributo del body de la respuesta es el nombre, y es igual a 'Song', entonces pasa.
    - **Should get a specific artist by id:** Se busca con Get utilizando el Id que tiene el artista 'Pepe' en la base de datos. Si el primer atributo del body de la respuesta es el nombre, y es igual a 'Pepe', entonces pasa.
    - **Should get a specific playlist by id:** Se busca con Get utilizando el Id que tiene la playlist 'Playlist1' en la base de datos. Si el primer atributo del body de la respuesta es el nombre, y es igual a 'Playlist1', entonces pasa.
- **patch.spec.ts**
  - **Update request**
    - **Update a song:** Se cambia mediante Patch el valor del atributo single de la canción base 'Song'. Pasa a ser true. Se comprueba que la respuesta de la operación nos da dicha canción con el atributo a true. Se vuelve a cambiar para dejarlo como estaba. 
    - **Update a artist:** Se modifica el artista 'Pepe' para que pase a tener una sola canción en lugar de tres. Se comprueba que el tamaño del array es 1. Se vuelve a dejar como estaba.
    - **Update a playlist:** Se modifica la playlist 'Playlist1' para que pase a tener un solo género asociado en lugar de tres. Se comprueba que el tamaño del array es 1. Se vuelve a dejar como estaba.
- **patchByID.spec.ts**: Se realizan tests casi idénticos, salvo que realizando la acción a través del identificador del objeto.
- **delete.spec.ts**
  - **Delete request**
    - **Should delete a song:** Se prueba a eliminar una canción. Se espera recibir un mensaje de estado '200' (éxito)
    - **Should delete a artist:** Se prueba a eliminar un artista. Se espera recibir un mensaje de estado '200' (éxito)
    - **Should delete a playlist:** Se prueba a eliminar una playlist. Se espera recibir un mensaje de estado '200' (éxito)
- **deleteByID.spec.ts**: Se realizan tests casi idénticos, salvo que realizando la acción a través del identificador del objeto.

Para realizar las pruebas, se utilizan las propias operaciones que hemos implementado, usando para ello el módulo chai-http, y se verifica su correcto funcionamiento, aprovechando para ello los **mensajes de estado** que hemos ido colocando en cada función.

Además, es importante tener en cuenta que las pruebas tienen una secuencia definida, incluyéndose algunos ficheros .spec dentro de otros. Por ejemplo, y el más visual, es el caso de delete.spec.ts (test de DELETE), que debe realizarse obligatoriamente después del post.spec.ts (test de POST). Esto es porque se probará la operación de borrado con DELETE sobre un objeto creado previamente con POST. 

Dejamos, además, el esquema de dependencias entre los tests para permitir una sencilla comprensión de lo recién nombrado:

- **post.spec.ts**
- **get.spec.ts**
- **getByID.spec.ts:** depende de **get.spec.ts**
- **delete.spec.ts:** depende de **post.spec.ts**
- **deleteByID.spec.ts:** depende de **deleteByID.spec.ts**
- **patch.spec.ts**
- **patchByID.spec.ts:** depende de **patch.spec.ts**

Dicho esto, cabe mencionar que las dependencias necesarias entre las pruebas genera una serie de posibles problemas entre las GitHub Actions. Esto es así porque en los tests se realizan peticiones que, como hemos visto, pueden llegar a entrar en conflicto si no se realizan en el orden adecuado. Por ello, hemos secuenciado también las propias GitHub Actions, añadiendo unas líneas al comienzo de cada fichero.

Por ejemplo, en el workflow de Coveralls tenemos lo siguiente:

    name: Coveralls
    on:
      workflow_run:
        workflows: ["Tests"]
        types:
          - completed


Por último, e hilando con el siguiente apartado, destacamos que en la carpeta /tests se han incluido las peticiones realizadas y que se han demostrado correctas. Cabe nombrar el hecho de que, para poder realizar las peticiones por ID, se debe contar con la ID de los objetos a manejar.
Esto implica que la acción "Coveralls" solo se realizará una vez haya terminado la acción "Tests".

**La secuencia establecida es Test ⟶ Coveralls ⟶ Sonarcloud**

*!Importante: Las pruebas se han planteado originalmente para probar las funcionalidades sobre el propio servidor.  n un contexto formal, esta es una mala práctica, pues los tests realizados nunca deben interferir en el funcionamiento habitual de la API. Por lo tanto, lo aconsejable sería realizar las pruebas en un segundo servidor, o incluso en local, donde solo estén los elementos con los que se vayan a realizar los tests. 

<br>

# Probando MusicTronik360
> Peticiones con Thunder Client

Para probar la API, se podrá hacer uso de Visual Studio Code, apoyado de la extensión Thunder Client. Con esta, solamente tendremos que realizar una nueva petición presionando el botón 'New Request'. 

Una vez dentro, cambiaremos el tipo de acción (Get, Post, Patch o Delete) dependiendo de la que queramos efectuar, y accederemos a la url correspondiente usando los atributos necesarios para ubicar el objeto en la base de datos, siguiendo las indicaciones que hemos ofrecido a lo largo del informe. 

Además, se hará uso del apartado 'Body', donde se colocarán aquellos objetos JSON creados por el usuario para, por ejemplo, realizar modificaciones en los objetos ya almacenados.

Como ejemplo, modifiquemos la duración de una canción. Probemos con la canción base que hemos preparado, cuyo título es 'Song'.

Estos serían los pasos a seguir:

- [New Request]
- Escogemos la acción PATCH a la izquierda de la URL
- Como URL, ponemos: https://musictronik360.herokuapp.com/song?name=Song
- En el apartado Body, colocamos: { "length": 200 }
- [Send]
- Recibiremos como respuesta un nuevo objeto JSON que representa a la canción de nombre 'Song' pero ahora su duración será de 200. Se pueden probar distintos valores para confirmar que, efectivamente, se está cambiando bien. También se puede probar con distintos atributos. 

<br>

# Conclusiones
> Izamos la bandera

Hemos superado los desafíos, y lo que obtenemos de resultado es una API funcional y sencilla de utilizar, dándole a cualquier usuario que lo desee la posibilidad de gestionar su propia librería musical digitalizada.

Es una aplicación flexible, sujeta a mejoras y aumentos de funcionalidad, y nacida con el propósito de acercar el control de la información al usuario que la disfruta. 

Presentamos así al público la primera versión de nuestro nuevo sistema, MusicTronik360.

Recomendamos el uso de todas las herramientas empleadas para construir nuestra API, pues todas ellas nos han parecido de gran utilidad y cómoda implementación.

Dicho eso, no queda más que ofrecer la descarga y prueba de nuestro código. 
_Esperamos que nuestra API responda con éxito su Request._

Gracias por su tiempo y atención, <br>
un saludo de Mario, Marco y Jonay.

**MusicTronik360, desarrollado por el Grupo R.**