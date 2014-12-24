set hls
set nu
set nocompatible              " be iMproved, required
""设置缩进
set tabstop=4
set softtabstop=4
set shiftwidth=4
set autoindent
set cindent
if &term=="xterm"
	    set t_Co=8
	        set t_Sb=^[[4%dm
		    set t_Sf=^[[3%dm
	    endif
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

Plugin 'tpope/vim-fugitive'

"vim-nodejs-complete
Plugin 'myhere/vim-nodejs-complete'
Plugin 'mattn/jscomplete-vim'

Bundle 'pangloss/vim-javascript'



" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line

" Configuration for pangloss/vim-javascript

let javascript_enable_domhtmlcss=1
let b:javasscript_fold=1
let javascript_ignore_javaScriptdoc=0



let g:javascript_conceal_function   = "ƒ"
let g:javascript_conceal_null       = "ø"
let g:javascript_conceal_this       = "@"
let g:javascript_conceal_return     = "⇚"
let g:javascript_conceal_undefined  = "¿"
let g:javascript_conceal_NaN        = "ℕ"
let g:javascript_conceal_prototype  = "¶"

filetype plugin on
setl omnifunc=jscomplete#CompleteJS
let g:jscomplete_use=['dom']
