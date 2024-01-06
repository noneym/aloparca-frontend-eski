const Price = ({ price }) => (
  <div>
    {
      parseFloat(price)
        .toFixed(2)
        .split('.')[0]
    }
    <span>
      .{
        parseFloat(price)
          .toFixed(2)
          .split('.')[1]
      }TL
    </span>
  </div>
);

export default Price;
