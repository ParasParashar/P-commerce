'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs";
import { Allison } from "next/font/google";
type searchProps = {
  search: string,
  category: string,
  propertySearch: string,
}
export async function getCategoryWiseProduct() {
  try {
    const category = await db.category.findMany({
      where: {
        product: {
          some: {
            isPublised: true
          }
        }
      },
      include: {
        product: true
      }
    });
    return category;
  } catch (error: any) {
    console.log('category fetch error', error.message)
  }
}


export async function getSearchProduct({ search, category, propertySearch }: searchProps) {
  try {
    if (search) {
      const findProductCategory = await checkCategory(search);
      if (!findProductCategory) return [];
      if (findProductCategory.length > 0) {
        const product = await db.product.findMany({
          where: {
            isPublised: true,
            category: {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            }
          },
          include: {
            properties: true,
            category: true
          }
        })
        return product;
      }
    }
    if (propertySearch) {
      const product = await db.product.findMany({
        where: {
          isPublised: true,
          category: {
            name: {
              contains: category,
              mode: 'insensitive'
            }
          },
        },
        include: {
          properties: true,
          category: true
        }
      });
      const filteredProducts = product.filter((product) => {
        if (product.dynamicProperties) {
          const dynamicPropertiesArray = Object.entries(product.dynamicProperties);
          // Iterate through the properties you want to search for
          for (const [key, value] of Object.entries(JSON.parse(propertySearch))) {
            // Check if the dynamic property array contains a matching key-value pair
            if (dynamicPropertiesArray.some(([propertyKey, propertyValue]) =>
              propertyKey === key && propertyValue === value
            )) {
              return true; // If a match is found, include the product
            }
          }
        }
        return false;
      });
      return filteredProducts;
    }


    const searchProduct = await db.product.findMany({
      where: {
        isPublised: true,
        name: {
          contains: search,
          mode: 'insensitive'
        },
        category: {
          name: {
            contains: category,
            mode: 'insensitive'
          }
        },
      },
      include: {
        category: true,
        properties: true
      }
    });
    return searchProduct;
    ;
  } catch (error: any) {
    console.log('category fetch error', error.message)
  }
}


export async function getAllCategoriesWithParents() {
  try {

    const allCategoris = db.category.findMany({
      where: {
        product: {
          some: {
            isPublised: true
          }
        }
      },
      include: {
        product: {
          select: {
            isPublised: true
          }
        }
      }
    });
    return allCategoris;

  } catch (error: any) {
    console.log('category all errro', error.message)
  }

}


export async function getSearchCategoryProperties(categoryName: string, productName: string) {
  try {
    // Check if the provided category name exists as a category
    if (productName) {
      const category = await checkCategory(productName)
      if (!category) return [];
      if (category.length < 0) {
        // Show properties of the product
        const properties = await db.category.findMany({
          where: {
            parent: {
              name: {
                contains: categoryName,
                mode: 'insensitive'
              }
            }

          },
          include: {
            properties: true,
            subcategories: true,
            parent: {
              include: {
                properties: true
              }
            },
            product: {
              where: {
                isPublised: true,
              }
            }
          },
        });
        return properties;
      }
      if (category.length > 0) {
        // show property of category
        const properties = await db.category.findMany({
          where: {
            name: {
              contains: productName,
              mode: 'insensitive'
            },
          },
          include: {
            subcategories: true,
            properties: true,
            product: {
              where: {
                isPublised: true
              }
            },
            parent: {
              include: {
                properties: true
              }
            }
          },
        });
        return properties;
      }
    }
    const properties = await db.category.findMany({
      where: {
        name: {
          contains: categoryName,
          mode: 'insensitive'
        },
        product: {
          some: {
            name: {
              contains: productName,
              mode: 'insensitive'
            },
          },
        },
      },
      include: {
        subcategories: true,
        properties: true,
        product: true,
        parent: {
          include: {
            properties: true
          }
        }
      },
    });
    return properties;

  } catch (error: any) {
    console.log('category properties', error.message);
    // Handle the error as needed.
  }
}

// ---------------
export async function checkCategory(search: string) {
  try {
    const findProductCategory = await db.category.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        },
      },
      include: {
        product: {
          where: {
            isPublised: true
          }
        }
      }
    })
    return findProductCategory;
  } catch (error) {
    console.log('chekcing erro')
  }
}

// creating and category and  product array

export async function getAllProductsAndCategory() {
  try {
    const products = await db.product.findMany({
      where: {
        isPublised: true
      },
      select: {
        name: true
      }
    });

    const categories = await db.category.findMany({
      select: {
        name: true
      }
    });
    const allItems = [...products, ...categories]
    return allItems

  } catch (error: any) {
    console.log(error.message, 'Error in getting all products and category')
  }

}
