# PB2 to PB3 Map Converter

This repository hosts a simple web application that converts a given PB2 .xml file into PB3 source code. User can then copy the source code into a creation's file content. This application is designed to only work with simple maps, porting the static components of a PB2 map into PB3. There may be more efforts into extending trigger action support in the future.

It's a simple Express JS typescript web application, with vanilla HTML, CSS and JS.

> [!NOTE]
> If you are only interested at the logic that handles the conversion of PB2 XML map to PB3 source code, the entry point is in src/process.ts.

[Link to web application](https://pb2mapconverter.vercel.app/).

### Limitations

1. There's no one to one correlation between many of the PB2 and PB3 objects, like walls, backgrounds, guns and vehicles. Substitutes have to be made.
2. Some background color multiplier may look different. This is because of how background multiplier works in PB2 vs PB3. Color multiplier in PB2 are twice as effective, which means a `#FFFFFF` doubles the color value of a given background. PB3's multiplies it by 1 instead of 2, and therefore any color multiplier above `#808080` in PB2 will appear duller in PB3.
3. Not all trigger actions are supported, only a very limited subset are supported.
4. There isn't a way to smoothly reuse the existing players for COOP and DM like in PB2. In the future, custom modules can be developed to support this but for now this is not implemented.

## Quick start

Install `Node v24.12.0` (there's a .nvmrc file if you need) if you don't have already.

- `npm -i` to download dependencies.
- `npm run dev` to run web application locally in development mode.

You can see additional scripts in `package.json` for other commands but they will not be used often (unless you are me).

### Building and deployment

> This section is most likely irrelevant to you

We use Vercel's serverless hosting functionality for deployment. Vercel's serverless setup means we do not follow the traditional `npm run build` and `npm run start` in a `dist` folder.

Run `vercel dev` to simulate Vercel's environment locally.

## File structure

The file follows a very standard ExpressJS template, without a dedicated `dist` directory. This is because we are using Vercel's serverless deployment, and no explicit building step is required.

```bash
pb2mapconverter
├───.vscode                 # Contains recommended VScode extensions used. (You can install these in the extensions tab)
├───docs                    # Code snippet copied from PB3's code that seems to represent the corresponding editor object (seems outdated tho)
├───public                  # Directory that hosts all static files (.html, .css, client side .js)
├───src                     # Directory that hosts the server's backend code.
│   ├───__tests__           # Unit testing
│   ├── app.ts              # Main HTTP Express server logic, and Vercel's "entry" point
│   ├── index.ts            # Main HTTP Express server logic, and local development entry point
│   └── ...                 # All of the other source code responsible for processing the .xml input
├───.gitignore              # Specifications for files/folders Git should ignore
├───.nvmrc                  # Defines the project's required Node.js version
├───.prettierignore         # Specifies files and folders for Prettier to ignore
├───.prettierrc             # Configuration rules for Prettier code formatting
├───eslint.config.js        # Code linting and style enforcement rules (Flat Config)
├───LICENSE                 # Open-source legal licensing agreements
├───package-lock.json       # Locked dependency tree to ensure reproducible builds
├───package.json            # Project manifest, dependencies, and script aliases
├───README.md               # Project overview, setup steps, and documentation
├───tsconfig.build.json     # TypeScript settings specific to the production build
├───tsconfig.json           # Global TypeScript compiler and type resolution rules
└───vercel.json             # Configuration for Vercel's serverless deployment
```

## Implementation details

### Overview

The PB2 .xml file contains all PB2 objects in a series of XML tags.
`<bg x="220" y="-480" w="400" h="320" m="0" c="#FFFFFF" />` is an example of a PB2 background. Properties are then extracted based on the XML tag's name and properties.

We first focus on parsing all of the XML tags into concrete PB2 typed objects (like PB2Wall, PB2Background, etc..). These are stored in a class called PB2Map.

We then do some post processing on PB2Map, converting features to PB3, like

1. Creating of PB3 specific objects like Assets from PB2's surface
2. Handling triggers, etc..

Finally, we serialize the processed PB2Map into a valid representation of PB3 source code.

1. A single PB3 object follows this format
   `{ *some javascript code* }//->Ditto->//{ *some JSON for editor* }`. For an example, a PB2 wall results in this line of code in PB3.

```js
pb2GameWorld.CreateBoxShape({ x: 0, y: 0, w: 10, h: 10, type: pb2Shape.WALL }); //->Ditto->//{"operation":"create","constructor":"pb2GameWorld.CreateBoxShape","x":"0","y":"0","w":"10","h":"10","m":"null","wc":"null","type":"pb2Shape.WALL","corner":"pb2Shape.CORNER_NONE","dots":"null","_points_being_edited":false,"_visible":"1","_locked":"0","_disabled":"0","id":""}
```

2. We start mapping each PB2/3 object into the corresponding javascript code and JSON editor object.
3. We finally concantenate these object into one string along with an appropriate default header and footer.

### Caveats

- Most of the spacing in the resulting serialized source code matters. Take a good close look at the previous example.
  No spacing between Ditto, code and JSON.. spacing in the javascript code.. etc..
- Property numbers in JSON editor object should actually be stored as a string. For an example,

```js
const editor_object = {
	/* .... */
	// must be string! the resulting source code must have the value wrapped in quotation marks.
	x: pb2Wall.geometry.x.toString(),
	y: pb2Wall.geometry.y.toString(),
	w: pb2Wall.geometry.w.toString(),
	h: pb2Wall.geometry.h.toString(),
	/* .... */
};
```
