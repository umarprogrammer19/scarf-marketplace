// Simple API test script
// Run with: node test-api.js

const BASE_URL = 'http://localhost:3001/api'

async function testAPI() {
  console.log('🚀 Testing E-Commerce API\n')

  try {
    // 1. Get all products
    console.log('1️⃣ GET /api/products')
    const allProducts = await fetch(`${BASE_URL}/products`)
    const allData = await allProducts.json()
    console.log(`✅ Found ${allData.data.length} products\n`)

    // 2. Get single product
    console.log('2️⃣ GET /api/products/1')
    const singleProduct = await fetch(`${BASE_URL}/products/1`)
    const singleData = await singleProduct.json()
    console.log(`✅ Product: ${singleData.data.title}\n`)

    // 3. Create new product
    console.log('3️⃣ POST /api/products')
    const newProduct = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Scarf - API Created',
        price: 1999,
        originalPrice: 3999,
        discount: 50,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
        category: 'Test Collection',
        stock: 100,
        isNew: true
      })
    })
    const createData = await newProduct.json()
    console.log(`✅ Created product with ID: ${createData.data.id}\n`)
    const createdId = createData.data.id

    // 4. Update product
    console.log('4️⃣ PUT /api/products/' + createdId)
    const updateProduct = await fetch(`${BASE_URL}/products/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stock: 50,
        price: 1799
      })
    })
    const updateData = await updateProduct.json()
    console.log(`✅ Updated product stock to: ${updateData.data.stock}\n`)

    // 5. Delete product
    console.log('5️⃣ DELETE /api/products/' + createdId)
    const deleteProduct = await fetch(`${BASE_URL}/products/${createdId}`, {
      method: 'DELETE'
    })
    const deleteData = await deleteProduct.json()
    console.log(`✅ ${deleteData.message}\n`)

    // 6. Test 404 error
    console.log('6️⃣ GET /api/products/nonexistent')
    const notFound = await fetch(`${BASE_URL}/products/nonexistent`)
    const notFoundData = await notFound.json()
    console.log(`✅ Error handling works: ${notFoundData.error}\n`)

    console.log('✨ All tests passed!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.log('\n⚠️  Make sure your dev server is running: npm run dev')
  }
}

testAPI()
