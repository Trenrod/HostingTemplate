package test

import (
	"os"
)

type StdinMock struct {
	origStdin *os.File
	reader    *os.File
	writer    *os.File
}

func NewStdinMock() *StdinMock {
	reader, writer, _ := os.Pipe()
	return &StdinMock{
		origStdin: os.Stdin,
		reader:    reader,
		writer:    writer,
	}
}

func (sm *StdinMock) SetInput(input string) {
	os.Stdin = sm.reader
	sm.writer.WriteString(input)
	sm.writer.Close()
}

func (sm *StdinMock) Reset() {
	os.Stdin = sm.origStdin
}
