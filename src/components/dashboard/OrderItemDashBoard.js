import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

export default function OrderItemDashBoard(prop) {
  const { order } = prop;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "600px", marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h6">Order ID: {order.id}</Typography>
        <Typography>Original Price: ${order.originalPrice}</Typography>
        <Typography>
          Date: {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
        <Typography>User ID: {order.userID}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle1">Order Details:</Typography>
          {order.orderDetails.map((item) => (
            <div key={`${order.id}-${item.productId}`}>
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                style={{ width: "50px", height: "50px" }}
              />
              <p>Name: {item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price}</p>
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
