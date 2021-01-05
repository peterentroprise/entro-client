import * as React from "react";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

import { Story } from "../../interfaces";

type ListDetailProps = {
  item: Story;
};

const StoryDetail = ({ item: story }: ListDetailProps) => {
  const storyLongDescription =
    story.storyLongDescription.json.content[0].content[0].value;
  return (
    <>
      <Box my={3}>
        <Card variant="outlined">
          <CardHeader
            title={story.storyName}
            subheader={story.storyShortDescription}
          />
          <CardContent>
            <Box my={1}>
              <img
                src={story.coverImage.url}
                style={{ maxWidth: "100%" }}
              ></img>
            </Box>
            <Box my={1}>
              <Typography>{storyLongDescription}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default StoryDetail;
