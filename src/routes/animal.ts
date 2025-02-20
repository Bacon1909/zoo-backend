import { AnimalModel } from "../models/animal.js";
import { Hono } from "hono";
import { AnimalSchema } from "../types.js";

export const animalRouter = new Hono();

// ******************* alle ausgeben *****************************
animalRouter.get("/", async (c) => {
  try {
    // Logik
    const animals = await AnimalModel.findAll();
    return c.json({
      data: animals,
    });
  } catch (error) {
    // Error handling
    console.error(error);
    c.json({
      error: "Something went wrong.",
    });
  }
});

// ********************** eines ausgeben ***************************
animalRouter.get("/:id", async (c) => {
  try {
    // Logik
    const animalId = parseInt(c.req.param("id"));
    if (isNaN(animalId)) {
      return c.json({
        error: "Invalid ID format.",
      });
    }

    const animal = await AnimalModel.findById(animalId);

    if (animal) {
      return c.json({
        data: animal,
      });
    } else {
      return c.json({
        error: "animal not found.",
      });
    }
  } catch (error) {
    // Error handling
    console.log(error);
    return c.json({
      error: "Something went wrong.",
    });
  }
});

//************************** Gehege updaten *************************+ */
animalRouter.patch("/:id", async (c) => {
  try {
    // Logik
    const animalId = parseInt(c.req.param("id"));
    if (isNaN(animalId)) {
      return c.json({
        error: "Invalid ID format.",
      });
    }

    const updates = await c.req.json();
    const updatedanimal = await AnimalModel.updateById(animalId, updates);

    if (updatedanimal) {
      return c.json({
        data: updatedanimal,
      });
    } else {
      return c.json({
        error: "animal not found.",
      });
    }
  } catch (error) {
    // Error handling
    console.log(error);
    return c.json({
      error: "Something went wrong.",
    });
  }
});
//s******************* gehege löschen*****************
animalRouter.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const deletedanimal = await AnimalModel.deleteById(id);

    if (deletedanimal) {
      return c.json({
        data: deletedanimal,
      });
    } else {
      return c.json({
        error: "animal not found.",
      });
    }
  } catch (error) {
    // Error handling
    console.log(error);
    return c.json({
      error: "Something went wrong.",
    });
  }
});

//************neues gehege erstellen *************/
animalRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = await AnimalSchema.safeParseAsync(body);

    if (result.success)
      return c.json({
        error: result.error,
      });
    return c.json(result.data);
  } catch (error) {
    // Error handling
    if (error instanceof SyntaxError) {
      return c.json({ error: "No JSON body provided" });
    }
    console.error(error);
    return c.json({
      error: "Something went wrong.",
    });
  }
});

// animalRouter.post("/", async (c) => {
//     try {
//       const updates = await c.req.json();
//       const createdAnimal = await AnimalModel.createAnimal(updates);

//       if (createdAnimal) {
//         return c.json({
//           data: createdAnimal,
//         });
//       } else {
//         return c.json({
//           error: "Gehege not found.",
//         });
//       }
//     } catch (error) {
//       // Error handling
//       console.log(error);
//       return c.json({
//         error: "Something went wrong.",
//       });
//     }
//   });
