import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 700px) {
    grid-template-columns: 1fr 1fr 1fr ;
  }
  gap: 20px;
  @media screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr  ;
  }
`;
function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (
        <>
          <ProductBox key={product._id} product={product} />

        </>
      ))}
    </StyledProductsGrid>
  )
}

export default ProductsGrid