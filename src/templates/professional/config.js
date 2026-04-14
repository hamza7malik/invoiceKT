import tealTheme from "./themes/teal";
import purpleTheme from "./themes/purple";
import blueTheme from "./themes/blue";
import navyTheme from "./themes/navy";
import greenTheme from "./themes/green";
import redTheme from "./themes/red";
import orangeTheme from "./themes/orange";
import slateTheme from "./themes/slate";

/**
 * Professional Template Configuration
 */

export const professionalTemplate = {
  id: "professional",
  name: "Professional",
  description: "Clean, professional invoice template with customizable colors",

  // Available color themes for this template
  themes: {
    teal: tealTheme,
    purple: purpleTheme,
    blue: blueTheme,
    navy: navyTheme,
    green: greenTheme,
    red: redTheme,
    orange: orangeTheme,
    slate: slateTheme,
  },

  // Default theme
  defaultTheme: "teal",

  // Template-specific settings
  features: {
    draggableItems: true,
    collapsibleSections: true,
    optionalFields: ["weekStart", "weekEnd", "paymentDetails"],
  },
};

export default professionalTemplate;
