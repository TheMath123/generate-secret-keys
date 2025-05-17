import { useEffect, useState } from 'react'
import { ModeToggle } from './components/mode-toggle'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { CopyButton } from './components/ui/copy-button'
import { Input } from './components/ui/input'
import { generateSecretKey } from './utils/generate-secret-key'

export function HomePage() {
  const [code, setCode] = useState('')

  const generateNewSecretKey = async () => {
    const newCode = await generateSecretKey()
    setCode(newCode as string)
  }

  useEffect(() => {
    generateNewSecretKey()
  }, []);

  return <div className='relative grid w-screen h-svh place-content-center selection:bg-green-500 selection:text-black'>
    <ModeToggle />
    <Card>
      <CardHeader>
        <CardTitle>Generate Secrets Keys</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='relative flex'>
          <Input
            placeholder='Hash'
            value={code}
            className='w-[400px] text-center selection:bg-green-500 selection:text-black'
          />
          <CopyButton
            textToCopy={code}
            className='absolute right-2 top-1/2 -translate-y-1/2'
          />

        </div>
        <Button
          variant='greens'
          onClick={generateNewSecretKey}
        >
          Generate
        </Button>
      </CardContent>
    </Card>
  </div>
}