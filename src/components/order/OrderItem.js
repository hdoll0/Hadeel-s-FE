import React, { useState } from "react";
import OrderDetail from "./OrderDetail";
import { Card, CardContent, CardActions, Collapse } from "@mui/material";
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

export default function OrderItem({ order }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "500px", marginTop: "20px" }}>
      <CardContent>
        <p>Order ID: {order.id}</p>
        <p>Original Price: ${order.originalPrice}</p>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
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
        {order.orderDetails.map((item) => (
          <OrderDetail key={`${order.id}-${item.productId}`} item={item} />
        ))}
      </Collapse>
    </Card>
  );
}
