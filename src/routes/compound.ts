import { log } from "console";
import type { Context } from "hono";
import { CompoundModel } from "../models/compound.js";
import { Hono } from "hono";

export const compoundRouter = new Hono();

// ******************* alle ausgeben *****************************
compoundRouter.get("/", async (c) => {
  try {
    // Logik
    const compounds = await CompoundModel.findAll();
    return c.json({
      data: compounds,
    });
  } catch (error) {
    // Error handling
    console.log(error);
    c.json({
      error: "Something went wrong.",
    });
  }
});

// ********************** eines ausgeben ***************************
compoundRouter.get("/:id", async (c) => {
  try {
    // Logik
    const compoundId = parseInt(c.req.param("id"));
    if (isNaN(compoundId)) {
      return c.json({
        error: "Invalid ID format.",
      });
    }

    const compound = await CompoundModel.findById(compoundId);

    if (compound) {
      return c.json({
        data: compound,
      });
    } else {
      return c.json({
        error: "Compound not found.",
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
compoundRouter.patch("/:id", async (c) => {
  try {
    // Logik
    const compoundId = parseInt(c.req.param("id"));
    if (isNaN(compoundId)) {
      return c.json({
        error: "Invalid ID format.",
      });
    }

    const updates = await c.req.json();
    const updatedCompound = await CompoundModel.updateById(compoundId, updates);

    if (updatedCompound) {
      return c.json({
        data: updatedCompound,
      });
    } else {
      return c.json({
        error: "Compound not found.",
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
compoundRouter.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const deletedCompound = await CompoundModel.deleteById(id);

    if (deletedCompound) {
      return c.json({
        data: deletedCompound,
      });
    } else {
      return c.json({
        error: "Compound not found.",
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
compoundRouter.post("/", async (c) => {
  try {
    const updates = await c.req.json();
    const createdGehege = await CompoundModel.createCompound(updates);

    if (createdGehege) {
      return c.json({
        data: createdGehege,
      });
    } else {
      return c.json({
        error: "Gehege not found.",
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
