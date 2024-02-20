import { Contact, About,  Projects, Home} from '../components/index'
const page = () => {
  return (
    <main className=''>
        <Home />
        <About />
        <Projects/>
        <Contact/>
    </main>
  )
}

export default page
