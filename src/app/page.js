
import Link from 'next/link'
export default function Home() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto ">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link href="/register">
              <p className="text-white">Cadastro</p>
            </Link>
          </li>
          <li>
            <Link href="/list">
              <p className="text-white">Lista Geral</p>
            </Link>
          </li>
          <li>
            <Link href="/deliveryList">
              <p className="text-white">Lista Final</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
