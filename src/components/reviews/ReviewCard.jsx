import React from "react";

import { Rating } from "@material-ui/lab";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";

export default function ReviewCard({ title, stars, description, date, user }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="left">
          {title && title !== "" ? title : "Titulo Review"}
        </Typography>
        <Typography variant="subtitle2">
          {user && user !== "" ? user : "Usuario"} -{" "}
          {date && date !== "" ? date : "27 de Mayo"}
        </Typography>
        <Grid container>
          <Rating
            value={stars && stars >= 1 ? stars : 4}
            name="review"
            size="small"
            readOnly="true"
          />
        </Grid>
        <Divider />
        <Typography align="left">
          {description && description !== ""
            ? description
            : "El usuario no dejo comentarios"}
        </Typography>
      </CardContent>
    </Card>
  );
}
