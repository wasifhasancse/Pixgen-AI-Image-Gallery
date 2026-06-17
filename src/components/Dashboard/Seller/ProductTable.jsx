import {Pagination, Table} from "@heroui/react";
import Link from "next/link";

const ProductTable = ({ productsData }) => {
  console.log(productsData);
  const totalPages = productsData?.totalPages || 1;
  const page = productsData?.page || 1;
  const totalData = productsData?.totalData || 0;
  const limit = productsData?.limit || 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="">
          <Table.Header>
            <Table.Column isRowHeader>#</Table.Column>
            <Table.Column>Title</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>status</Table.Column>
          </Table.Header>
          <Table.Body>
            {productsData?.photosData?.map((product, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>$ {product.price}</Table.Cell>
                <Table.Cell>{product.status}</Table.Cell>
              </Table.Row>
            ))}

          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {page} to {limit} of {totalData} results
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}

              >
                <Link className="flex items-center gap-2" href={`/dashboard/seller/products?page=${page - 1}`}>
                <Pagination.PreviousIcon />
                  Prev
                </Link>
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Link href={`/dashboard/seller/products?page=${p}`}>
                  <Pagination.Link className={`${p === page && 'bg-gray-300 text-white'}`} isActive={p === page}>
                  {p}
                </Pagination.Link>
                </Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
              >
                <Link className="flex items-center gap-2" href={`/dashboard/seller/products?page=${page + 1}`}>
                Next
                <Pagination.NextIcon />
                </Link>
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
};

export default ProductTable;
