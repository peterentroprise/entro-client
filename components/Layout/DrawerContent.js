import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFlags } from "@happykit/flags";

import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  MenuIcon,
  Drawer,
  Button,
  List,
  Divider,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import RecentActorsOutlinedIcon from "@material-ui/icons/RecentActorsOutlined";
import BubbleChartOutlinedIcon from "@material-ui/icons/BubbleChartOutlined";

import Link from "../Link";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const router = useRouter();
  const flags = useFlags();
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  const navTo = (href) => {
    router.push(href);
  };

  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {flags.threads && (
          <ListItem
            onClick={() => {
              navTo("/threads");
              toggleDrawer();
            }}
            button
          >
            <ListItemIcon>
              <ListOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Threads" />
          </ListItem>
        )}

        {flags.stories && (
          <ListItem
            onClick={() => {
              navTo("/stories");
              toggleDrawer();
            }}
            button
          >
            <ListItemIcon>
              <RecentActorsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Stories" />
          </ListItem>
        )}

        <ListItem
          onClick={() => {
            navTo("/users");
            toggleDrawer();
          }}
          button
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem
          onClick={() => {
            navTo("/graph");
            toggleDrawer();
          }}
          button
        >
          <ListItemIcon>
            <BubbleChartOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Graph" />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list}>
        <ListItem
          onClick={() => {
            navTo("/");
            toggleDrawer();
          }}
          button
        >
          <ListItemIcon>
            <InfoOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </>
  );
}