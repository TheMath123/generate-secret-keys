import { useEffect, useState } from 'react'
import { ModeToggle } from './components/mode-toggle'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { CopyButton } from './components/ui/copy-button'
import { Input } from './components/ui/input'
import { generateSecretKey } from './utils/generate-secret-key'

export function HomePage() {
  const [code, setCode] = useState('')
  const [history, setHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem("secretKeyHistory")
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  const generateNewSecretKey = async () => {
    if (code) {
      setHistory((prev) => {
        const newHistory = [code, ...prev].slice(0, 10)
        return newHistory
      })
    }
    const newCode = await generateSecretKey()
    setCode(newCode as string)
  }

  useEffect(() => {
    localStorage.setItem("secretKeyHistory", JSON.stringify(history))
  }, [history])

  useEffect(() => {
    generateNewSecretKey()
  }, []);

  return <div className='grid grid-row-2 h-svh place-content-center gap-10 selection:bg-green-500 selection:text-black overflow-hidden'>
    <ModeToggle />
    <Card className='z-50 mx-auto'>
      <CardHeader className='flex items-center gap-2'>
        <img
          src='/generate-secrets-keys.svg'
          alt=''
          className='w-10 h-10'
          aria-label='Generate Secrets Keys Icon'
        />
        <CardTitle>Generate Secrets Keys</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 '>
        <div className='relative flex'>
          <Input
            placeholder='Hash'
            value={code}
            className='w-full min-w-[350px] text-center selection:bg-green-500 selection:text-black text-sm'
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
    <div className='flex-col gap-4 items-center mx-auto'>
      {history.length > 0 && (
        <div className="relative max-w-[500px] overflow-hidden">
          <div className="flex flex-col gap-2 items-center">
            {history.map((item, index) => (
              <div
                key={`history-${index}`}
                className="flex flex-row items-center gap-2 justify-between w-full p-4 bg-card rounded-none border-2"
              >
                <span className="text-sm truncate text-muted-foreground select-all text-center w-full">
                  {item}
                </span>
                <CopyButton textToCopy={item} classNameIcon='text-muted-foreground' />
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-background to-transparent"></div>
        </div>
      )}

    </div>
  </div>
}