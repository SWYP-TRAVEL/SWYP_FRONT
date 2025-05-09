import type { Preview } from "@storybook/react";
import { ModalProvider } from '../src/providers/ModalProvider';
import "@fontsource/pretendard";
import "../src/app/globals.css";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        xs: {
          name: "XS (375–767)",
          styles: {
            width: "375px",
            height: "800px",
          },
        },
        sm: {
          name: "SM (768–991)",
          styles: {
            width: "768px",
            height: "800px",
          },
        },
        md: {
          name: "MD (992–1199)",
          styles: {
            width: "992px",
            height: "800px",
          },
        },
        lg: {
          name: "LG (1200–1599)",
          styles: {
            width: "1200px",
            height: "800px",
          },
        },
        xl: {
          name: "XL (1600+)",
          styles: {
            width: "1600px",
            height: "800px",
          },
        },
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <ModalProvider>
          <Story />
        </ModalProvider>
      )
    }
  ]
};

export default preview;
