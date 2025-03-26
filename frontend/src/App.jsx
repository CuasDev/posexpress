import { useEffect, useState } from 'react'
import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material'
import axios from 'axios'
import './styles/global.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products')
        setProducts(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return ( <Container style={{ display: 'flex', justifyContent: 'center', padding: '2rem'}}>
      <CircularProgress />
    </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography color='error'>Error: {error}</Typography>
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Productos Destacados
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={"https://via.placeholder.com/300"}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
export default App
