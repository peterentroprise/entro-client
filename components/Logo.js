import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function Logo() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Image src="/transparentLogo.png" alt="Logo" width={500} height={500} />
    </Box>
  );
}

export default Logo;