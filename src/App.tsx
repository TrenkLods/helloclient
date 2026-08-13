
import RouterMenu from './components/examples/RouterMenu'
import { BiBarChart, BiTrendingUp } from 'react-icons/bi'



function App() {
  return (
    <div className="flex flex-col h-screen">
      <RouterMenu>
        <RouterMenu.Item label='Главная' to="/" />
        <RouterMenu.Group label='Группа 1' icon={<BiTrendingUp />}>
          <RouterMenu.Item label='Пункт 1' to='/path/1/' />
          <RouterMenu.Item label='Пункт 2' to='/path/2' />
        </RouterMenu.Group>
        <RouterMenu.Item label='Пункт 3' to='/path/3' icon={<BiBarChart />} />
        <RouterMenu.Item label='Пункт 4' to='/path/4' icon={<BiBarChart />} />
      </RouterMenu>
    </div>
  )
}

export default App